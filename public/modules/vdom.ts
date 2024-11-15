type Attributes = Record<string, string>;

export interface ExtendedNode extends Node {
	_vnode?: VNode;
}

export interface VNode {
	key: string;
	tagName: string;
	attrubutes: Attributes;
	handlers: Handler[];
	children: (VNode | string)[];
}

interface Handler {
	event: string;
	callback: (event: Event) => void;
}

interface VElement extends Element {
	_vnode: VNode;
}

interface VChildNode extends ChildNode {
	_vnode?: VNode;
}

export const vNodesFromString = (htmlStr: string): (VNode | string)[] => {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = htmlStr;
	const nodes = Array.from(wrapper.childNodes);
	return nodes.map((node) => {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				return vNodeFromNode(node as VElement);
			case Node.TEXT_NODE:
				return vNodeFromNode(node as Text);
		}
		return '';
	});
};

const vNodeFromNode = (node: VChildNode): VNode | string => {
	if (node instanceof Text) {
		return node.textContent ? node.textContent : '';
	}
	const elementNode = node as VElement;
	const children = Array.from(node.childNodes).map((node) => {
		return vNodeFromNode(node);
	});
	let key = elementNode.getAttribute('data-key');
	if (!key) {
		const parentNode = elementNode.parentNode;
		if (parentNode) {
			const nodes = Array.from(parentNode.childNodes);
			const i = nodes.indexOf(elementNode);
			key = `${elementNode.tagName}-${elementNode.className}-${i}`;
		} else {
			throw new Error('Element has no key and parent');
		}
	}
	const vnode = {
		key,
		tagName: elementNode.tagName,
		attrubutes: attributesFromNode(elementNode),
		handlers: [],
		children,
	};
	elementNode._vnode = vnode;
	return vnode;
};

const attributesFromNode = (node: Element): Attributes => {
	const attributes: Attributes = {};
	Array.from(node.attributes).forEach((attr) => {
		attributes[attr.name] = attr.value;
	});
	return attributes;
};

export const create = (vnode: VNode | string): Node => {
	if (typeof vnode === 'string') {
		return document.createTextNode(vnode);
	}
	const element = document.createElement(
		vnode.tagName,
	) as unknown as VElement;
	Object.entries(vnode.attrubutes).forEach(([attrName, attrValue]) => {
		element.setAttribute(attrName, attrValue);
	});
	element.setAttribute('data-key', vnode.key);
	vnode.handlers.forEach((handler) => {
		element.addEventListener(handler.event, handler.callback);
	});
	vnode.children.forEach((child) => {
		element.appendChild(create(child));
	});
	element._vnode = vnode;
	return element;
};

export const update = (node: ExtendedNode, vnode: VNode | string) => {
	if (node.nodeType === Node.TEXT_NODE) {
		node.textContent = vnode as string;
	}
	const elementNode = node as VElement;
	const elementVNode = vnode as VNode;
	elementVNode.attrubutes['data-key'] = elementVNode.key;
	updateAttrs(
		elementNode,
		Object.entries(elementNode.attributes).map(([, attr]) => attr),
		elementVNode.attrubutes,
	);
	updateHandlers(
		elementNode,
		elementNode._vnode.handlers,
		elementVNode.handlers,
	);
	updateChildren(
		elementNode,
		elementNode._vnode.children,
		elementVNode.children,
	);
	elementNode._vnode = elementVNode;
};

const updateAttrs = (node: Element, prevAttrs: Attr[], attrs: Attributes) => {
	Object.entries(attrs).forEach(([name, value]) => {
		node.setAttribute(name, value);
	});
	prevAttrs.forEach((prevAttr) => {
		if (!attrs || !(prevAttr.name in attrs)) {
			node.removeAttribute(prevAttr.name);
		}
	});
};

const updateChildren = (
	node: Element,
	prevChildren: (VNode | string)[],
	newChildren: (VNode | string)[],
) => {
	for (let i = 0, j = 0; i < newChildren.length; i++, j++) {
		const newVChild = newChildren[i];
		const prevVChild = prevChildren[j];

		const fromString = typeof prevVChild === 'string';
		const toString = typeof newVChild === 'string';

		if (toString && fromString) {
			node.childNodes[i].textContent = newVChild;
		} else if (
			!fromString &&
			!toString &&
			prevVChild &&
			newVChild.key === prevVChild.key
		) {
			update(node.childNodes[i], newVChild);
		} else {
			const newNode = create(newVChild);
			node.insertBefore(newNode, node.childNodes[i]);
			j--;
		}
	}
	while (newChildren.length < node.childNodes.length) {
		node.removeChild(node.childNodes[node.childNodes.length - 1]);
	}
};

const updateHandlers = (
	node: Element,
	prevHandlers: Handler[],
	newHandlers: Handler[],
) => {
	const maxLength =
		newHandlers.length > prevHandlers.length
			? newHandlers.length
			: prevHandlers.length;
	for (let i = 0; i < maxLength; i++) {
		const newHandler = newHandlers[i];
		const prevHandler = prevHandlers[i];

		if (!newHandler || newHandler.callback !== prevHandler.callback) {
			node.removeEventListener(prevHandler.event, prevHandler.callback);
		}
		if (!prevHandler || newHandler.callback !== prevHandler.callback) {
			node.addEventListener(newHandler.event, newHandler.callback);
		}
	}
};

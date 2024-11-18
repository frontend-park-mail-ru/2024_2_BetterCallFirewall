const SVG_TAGS = ['svg', 'path'];

const isEmptyString = (str: string): boolean => {
	const regex = /^\s*\n\s*$/;
	const emptyRegex = /^\s*$/;
	return regex.test(str) || emptyRegex.test(str);
};

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

export interface Handler {
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
	let vnodes = nodes.map((node) => {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				return vNodeFromNode(node as VElement);
			case Node.TEXT_NODE:
				return vNodeFromNode(node as Text);
		}
		return '';
	});
	vnodes = vnodes.filter((vnode) => {
		if (!vnode) {
			return false;
		}
		if (typeof vnode === 'string' && isEmptyString(vnode)) {
			return false;
		}
		return true;
	});
	return vnodes as (VNode | string)[];
};

const vNodeFromNode = (node: VChildNode): VNode | string | undefined => {
	if (node.nodeType === Node.TEXT_NODE) {
		if (!node.textContent) {
			return undefined;
		} else if (isEmptyString(node.textContent)) {
			return undefined;
		}
		return node.textContent;
	}
	const elementNode = node as VElement;
	const children: (VNode | string)[] = [];
	Array.from(node.childNodes).forEach((node) => {
		const vnode = vNodeFromNode(node);
		if (vnode) {
			children.push(vnode);
		}
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
	let element: VElement;
	if (SVG_TAGS.indexOf(vnode.tagName) >= 0) {
		const svgNamespace = 'http://www.w3.org/2000/svg';
		element = document.createElementNS(
			svgNamespace,
			vnode.tagName,
		) as unknown as VElement;
	} else {
		element = document.createElement(vnode.tagName) as unknown as VElement;
	}
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
		if (typeof vnode === 'string') {
			node.textContent = vnode;
		}
		return;
	}
	const elementNode = node as VElement;
	const elementVNode = vnode as VNode;
	elementVNode.attrubutes['data-key'] = elementVNode.key;
	updateAttrs(
		elementNode,
		elementNode._vnode.attrubutes,
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

const updateAttrs = (
	node: Element,
	prevAttrs: Attributes,
	attrs: Attributes,
) => {
	Object.entries(attrs).forEach(([name, value]) => {
		node.setAttribute(name, value);
	});
	Object.keys(prevAttrs).forEach((name) => {
		if (!attrs || !(name in attrs)) {
			node.removeAttribute(name);
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
			const childNode = node.childNodes[i];
			if (childNode) {
				childNode.textContent = newVChild;
			}
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
	let i = newChildren.length;
	while (newChildren.length < node.childNodes.length) {
		const childNode = node.childNodes[node.childNodes.length - 1];
		const childVNode = prevChildren[i];
		if (childVNode && typeof childVNode !== 'string') {
			childVNode.handlers.forEach((handler) => {
				childNode.removeEventListener(handler.event, handler.callback);
			});
		}
		node.removeChild(childNode);
		i++;
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

export const findVNodeByKey = (from: VNode, key: string): VNode | undefined => {
	return bfs(from, (vnode) => {
		if (vnode.key === key) {
			return vnode;
		}
	});
};

export const findVNodeByClass = (
	from: VNode,
	className: string,
): VNode | undefined => {
	return bfs(from, (vnode) => {
		if (vnode.attrubutes.class) {
			const classNames = vnode.attrubutes.class.split(' ');
			if (classNames.indexOf(className) >= 0) {
				return vnode;
			}
		}
	});
};

export const findVNodesbyTagName = (from: VNode, tagName: string): VNode[] => {
	return bfsAll(from, (vnode) => {
		if (vnode.tagName.toLowerCase() === tagName) {
			return vnode;
		}
	});
};

const bfs = (
	from: VNode,
	callback: (vnode: VNode) => VNode | undefined,
): VNode | undefined => {
	let queue: (VNode | string)[] = [...from.children];
	while (queue.length > 0) {
		const vnode = queue.shift();
		if (vnode && typeof vnode !== 'string') {
			const result = callback(vnode);
			if (result) {
				return result;
			}
			queue = queue.concat([...vnode.children]);
		}
	}
};

const bfsAll = (
	from: VNode,
	callback: (vnode: VNode) => VNode | undefined,
): VNode[] => {
	const result = [];
	let queue: (VNode | string)[] = [...from.children];
	while (queue.length > 0) {
		const vnode = queue.shift();
		if (vnode && typeof vnode !== 'string') {
			const found = callback(vnode);
			if (found) {
				result.push(found);
			}
			queue = queue.concat([...vnode.children]);
		}
	}
	return result;
};

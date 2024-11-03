import { Action } from '../actions/action';
import { ActionAppInit } from '../actions/actionApp';
import {
	ActionPostsRequestFail,
	ActionPostsRequestSuccess,
} from '../actions/actionFeed';
import { ActionUpdateProfileLinkHref } from '../actions/actionMenu';
import {
	ActionProfileGetHeaderFail,
	ActionProfileGetHeaderSuccess,
	ActionProfileGetYourOwnProfileFail,
	ActionProfileGetYourOwnProfileSuccess,
	ActionProfileRequestFail,
	ActionProfileRequestSuccess,
} from '../actions/actionProfile';
import { ActionUserUnauthorized } from '../actions/actionUser';
import app from '../app';
import dispatcher from '../dispatcher/dispatcher';
import ajax, { QueryParams } from '../modules/ajax';

export const STATUS = {
	ok: 200,
	noMoreContent: 204,
	badRequest: 400,
	unauthorized: 401,
	wrongMethod: 405,
	internalServerError: 500,
};

class API {
	sendAction(action: Action) {
		dispatcher.getAction(action);
	}

	async requestProfile(href: string) {
		const response = await ajax.getProfile(href);
		switch (response.status) {
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case 400:
			case 405:
				this.sendAction(
					new ActionProfileRequestFail({ status: response.status }),
				);
				break;
			case 200:
				if (!response.data) {
					this.sendAction(
						new ActionProfileRequestFail({
							status: response.status,
							message: 'empty data',
						}),
					);
					return;
				}
				this.sendAction(
					new ActionProfileRequestSuccess({
						profileResponse: response.data,
					}),
				);
				break;
		}
	}

	async requestYourOwnProfile() {
		const response = await ajax.getYourOwnProfile();
		switch (response.status) {
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case 400:
			case 405:
				this.sendAction(
					new ActionProfileGetYourOwnProfileFail({
						status: response.status,
					}),
				);
				break;
			case 200:
				if (!response.data) {
					this.sendAction(
						new ActionProfileGetYourOwnProfileFail({
							status: response.status,
							message: 'empty body',
						}),
					);
					return;
				}
				this.sendAction(
					new ActionProfileGetYourOwnProfileSuccess({
						profile: response.data,
					}),
				);
		}
		if (!app.inited) {
			this.sendAction(new ActionAppInit());
		}
	}

	async requestPosts(lastPostId: number): Promise<void> {
		const params: QueryParams = {};
		if (lastPostId >= 0) {
			params.id = `${lastPostId}`;
		}
		const response = await ajax.getPosts(params);
		switch (response.status) {
			case 200:
				if (!response.data) {
					break;
				}
				this.sendAction(new ActionPostsRequestSuccess(response.data));
				break;
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
					}),
				);
				break;
			case 204:
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
						message: response.message,
					}),
				);
		}
	}

	async requestHeader(): Promise<void> {
		const response = await ajax.getHeader();
		switch (response.status) {
			case 200:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionProfileGetHeaderSuccess({
						headerResponse: response.data,
					}),
				);
				this.sendAction(
					new ActionUpdateProfileLinkHref(
						`/${response.data.author_id}`,
					),
				);
				break;
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				this.sendAction(
					new ActionProfileGetHeaderFail({ status: response.status }),
				);
				break;
		}
		if (!app.inited) {
			this.sendAction(new ActionAppInit());
		}
	}
}

export default new API();

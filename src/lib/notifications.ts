import { writable } from 'svelte/store';

export type TNotification = 'success' | 'error' | 'info';

export interface INotification {
	id: number;
	type: TNotification;
	title: string;
	message: string;
}

export const notifications = writable<INotification[]>([]);

export const notificationsStore = {
	notifications: notifications.subscribe,
	add(type: TNotification, title: string, message: string) {
		notifications.update((value) => {
			const id = value.length > 0 ? value[0].id + 1 : 0;

			value.unshift({ id, type, title, message });

			setTimeout(() => {
				notificationsStore.remove(id);
			}, 3000);

			return value;
		});
	},
	remove(id: number) {
		notifications.update((notifications) => {
			const idx = notifications.findIndex((notification) => notification.id === id);

			if (idx === -1) return notifications;

			notifications.splice(idx, 1);

			return notifications;
		});
	}
};

export default notificationsStore;

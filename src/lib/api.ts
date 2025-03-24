// eslint-disable-next-line
export namespace Api {
	export async function fetchApi(opts: {
		route: string;
		method: string;
		// eslint-disable-next-line
		body: any;
		// eslint-disable-next-line
		headers?: any;
	}) {
		try {
			const resp = await fetch(`http://127.0.0.1:8080/${opts.route}`, {
				method: opts.method,
				body: opts.body,
				headers: opts.headers
			});

			const data = await resp.json();

			if (resp.ok) return data;

			return data.bad;
		} catch (err) {
			if (err) throw err;
			console.error(err);
		}
	}

	export async function createEvent(address: string, eventName: string) {
		const opts = {
			method: 'POST',
			route: 'api/event/save',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				eventCreator: address,
				eventName
			})
		};

		return await fetchApi(opts);
	}
}

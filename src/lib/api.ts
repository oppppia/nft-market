// eslint-disable-next-line
export namespace Api {
	// eslint-disable-next-line
	export async function fetchApi(opts: { route: string; method: string; body: any }) {
		try {
			const resp = await fetch(`http://127.0.0.1:8080/${opts.route}`, {
				method: opts.method,
				body: opts.body
			});

			const data = await resp.json();

			if (resp.ok) return data;

			return data.bad;
		} catch (err) {
			if (err) throw err;
			console.error(err);
		}
	}
}

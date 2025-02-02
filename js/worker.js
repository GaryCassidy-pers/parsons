/* global loadPyodide, importScripts */

importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.1/full/pyodide.js');

async function loadPyodideAndRemember() {
	self.pyodide = await loadPyodide();
}
let pyodideReadyPromise = loadPyodideAndRemember();

self.onmessage = async (event) => {
	await pyodideReadyPromise;
	const python = event.data;
	try {
		/* let results = await self.pyodide.runPythonAsync(python); */
		let results = await self.pyodide.runPython(python);
		self.postMessage({results});
	} catch (error) {
		self.postMessage({error: error});
	}
};

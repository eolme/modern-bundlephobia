import precompiledMitt from "next/dist/esm/shared/lib/mitt.js";

const importedMitt = precompiledMitt.default || precompiledMitt;

const mitt = (...args) => Reflect.apply(importedMitt, importedMitt, args);

mitt.default = mitt;

export { mitt, mitt as default };

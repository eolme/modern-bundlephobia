import { constants, gzip as gzipCompress } from "node:zlib";

export const gzip = (buffer: Uint8Array) =>
	new Promise<number>((resolve, reject) => {
		gzipCompress(
			buffer,
			{
				level: constants.Z_MAX_LEVEL,
				memLevel: constants.Z_MAX_MEMLEVEL,
				maxOutputLength: buffer.byteLength,
			},
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.byteLength);
				}
			},
		);
	});

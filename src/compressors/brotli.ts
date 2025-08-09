import { brotliCompress, constants } from "node:zlib";

export const brotli = (buffer: Uint8Array) =>
	new Promise<number>((resolve, reject) => {
		brotliCompress(
			buffer,
			{
				maxOutputLength: buffer.byteLength,
				params: {
					[constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
					[constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
					[constants.BROTLI_PARAM_SIZE_HINT]: buffer.byteLength,
					[constants.BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING]: true,
				},
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

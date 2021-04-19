import { Request, Response } from 'express';
import { Controller, Middleware, Post, ClassErrorMiddleware } from '@overnightjs/core';
import { validateBody } from '../middlewares/validation/validate';
import { errorHandler } from '../middlewares/common/errorHandler';

import createKeyManager from '../service/KeyManager/KeyManager';
import createFileSigner from '../service/FileSigner/FileSigner';

import { b64_encode } from 'jkurwa';

@Controller('sign')
@ClassErrorMiddleware(errorHandler)
export class SignController {
  @Post()
  @Middleware(validateBody({
    fields: {
      file_contents: {
        required: true,
        type: 'string',
        min: 1,
      },
      key: {
        required: true,
        type: 'string',
        min: 1,
      },
      password: {
        required: true,
        type: 'string',
        min: 1,
      },
      eds_key_type: {
        required: false,
        type: 'string',
        min: 1,
        max: 3,
      }
    }
  }))
  private async signFile(req: Request, res: Response) {
    try {
      const { file_contents, key, password, eds_key_type } = req.body;

      const keyManager = createKeyManager(eds_key_type);
      const fileSigner = createFileSigner(file_contents);

      const signerKey = await keyManager.getSignerKey(key, password);
      const result = await fileSigner.signWith(signerKey);

      return res.status(200).json({ signed_file: b64_encode(result) });
    } catch (e) {
      return res.status(400).json({
        name: 'Bad request',
        details: e
      });
    }
  }
}
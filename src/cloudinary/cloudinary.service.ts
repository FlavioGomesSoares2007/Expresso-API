import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { Multer } from 'multer';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: any,
    folder: string,
    width: number,
    height: number,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: `expresso_api/${folder}`,
          resource_type: 'auto',
          transformation: [
            { width: width, height: height, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary result undefined'));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }

  async deleteFile(
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          throw reject(error);
        }
        resolve(result);
      });
    });
  }

  extractPublicId(url: string): string {
    const parts = url.split('/');
    const fileNameWithExtension = parts.pop() || '';
    const folderPath = parts.slice(parts.indexOf('expresso_api')).join('/');
    const publicId = `${folderPath}/${fileNameWithExtension.split('.')[0]}`;
    return publicId;
  }
}

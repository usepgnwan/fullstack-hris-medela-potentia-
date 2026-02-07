import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const saveBase64File = (base64: string, folder = 'absensi'): string => {
  const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 string');

  const ext = matches[1].split('/')[1]; // jpg, png, dll
  const data = matches[2];
  
  const folderPath = join(process.cwd(), 'uploads', folder);

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
  }

  const fileName = `${uuidv4()}.${ext}`;
  const filePath = join(folderPath, fileName);

  writeFileSync(filePath, Buffer.from(data, 'base64'));
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/uploads/${folder}/${fileName}`;
};

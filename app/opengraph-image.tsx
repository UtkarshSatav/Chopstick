import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export const alt = 'Chopsticks Spice Malbar';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Font loading could be added here if needed, but for image only it's fine
    const logoPath = join(process.cwd(), 'public/chopsticklog.png');
    const logoData = await readFile(logoPath);
    const logoBase64 = logoData.toString('base64');

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#FFF8F0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`data:image/png;base64,${logoBase64}`}
                    style={{ width: '500px', height: '500px', objectFit: 'contain' }}
                    alt="Logo"
                />
            </div>
        ),
        {
            ...size,
        }
    );
}

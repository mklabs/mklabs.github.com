import { ImageResponse } from 'next/og'
import { title } from '../vars';
import path from 'path';
import { readFile } from 'fs/promises';

export async function GET(request: Request) {
  // const imageData = await readFile('../favicon.ico');

  const favicon = await readFile(path.join('app/favicon.ico'));
        {/* <div tw="flex flex-col w-full h-full items-center justify-center bg-neutral-900">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left text-slate-400">
              <img src="https://mklabs.github.io/favicon-32x32.png" width={32} height={32} />
              {defaultTitle}
            </h2>


          </div>
        </div> */}

  return new ImageResponse(
    (
        <div
          tw="bg-neutral-900"
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFCF0',
            // backgroundColor: '#fff',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          {/* <svg
            width="75"
            viewBox="0 0 75 65"
            fill="#FFFCF0"
            style={{ margin: '0 75px' }}
          >
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg> */}

          <div style={{ marginTop: 40 }}>{title}</div>
          🙌	
        </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res :NextResponse) {
    const response = NextResponse.next(
        {
            request: {
                headers: new Headers(req.headers)
            }
        }
    )
    // response.headers.forEach(header => console.log(header))
    response.headers.set('authorised-student', 'true')
    response.cookies.delete('second')
    response.cookies.set('is auth', 'true')
      const cookie = req.cookies.get('auth')?.valueOf()
      const allCookies = req.cookies

    console.log(allCookies)
//   return NextResponse.redirect(new URL('/about-2', request.url))
return response
}

export const config = {
    matcher: '/'
  }
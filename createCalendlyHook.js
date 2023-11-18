// {
//   resource: {
//     avatar_url: '',
//     created_at: '2021-10-17T13:47:02.688618Z',
//     current_organization: 'https://api.calendly.com/organizations/XXX',
//     email: 'XXX',
//     name: 'XXX XXX',
//     resource_type: 'User',
//     scheduling_url: 'https://calendly.com/XXX',
//     slug: 'XXX',
//     timezone: 'Asia/Bangkok',
//     updated_at: '2023-11-18T03:35:25.589782Z',
//     uri: 'https://api.calendly.com/users/XXX'
//   }
// }
const token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzAwMzIwNzMwLCJqdGkiOiI3NDAzNmRmMi1jZGQ1LTRmZTUtYjdjZS0xYmViNWZhYzBiZDYiLCJ1c2VyX3V1aWQiOiJFRkFHN1BKTVVOV1BEUE5JIn0.gV2g796i9LjO8n7hm0C6qIWbdV9TjLnboPX8a2KqDDkYwbkjqu3o_uHBeyqKqXTh2Z_fFQDWDYxiQ9XtW94fsg'
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

const getUserInfo = async () => {
  try {
    const response = await fetch('https://api.calendly.com/users/me', {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log({ data });
    const postData = {
      organization: data.resource.current_organization,
      url: 'https://www.thinkthaithai.com/api/calendar',
      events: ['invitee.created', 'invitee.canceled'],
      user: data.resource.uri,
      scope: 'user',
    };

    const response2 = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData),
    });



    const responseData = await response2.json();
    console.log('Webhook Subscription Response:', JSON.stringify(responseData, null, 2));



  } catch (error) {
    console.error('Error:', error.message);
  }
};

getUserInfo();



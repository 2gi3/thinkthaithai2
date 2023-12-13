// Log in to Calendly and get a TOKEN from this page: https://calendly.com/integrations/api_webhooks

const token = 'get a token from calendly'
const productionUrl = 'Add the base url here' //DO NOT add the path eg: (https://www.thinkthaithai.com)
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
      url: `${productionUrl}/api/calendar`,
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



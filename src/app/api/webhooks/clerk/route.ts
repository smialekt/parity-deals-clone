import { createUserSubscription } from '@/server/db/subscription';
import { deleteUser } from '@/server/db/users';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log('hi');
    switch (evt.type) {
      case 'user.created': {
        await createUserSubscription({
          clerkUserId: evt.data.id,
          tier: 'Free',
        });
        break;
      }
      case 'user.deleted': {
        if (evt.data.id) {
          await deleteUser(evt.data.id);
          // TODO: remove stripe subscription
        }
        break;
      }
    }

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log('Webhook payload:', evt.data);

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

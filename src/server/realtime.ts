import Pusher from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new Pusher({
	appId: process.env.PUSHER_APP_ID || "",
	key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
	secret: process.env.PUSHER_SECRET || "",
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
	useTLS: true,
});

export const createPusherClient = () =>
	new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
		cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
		forceTLS: true,
	});

export const notifyUser = async (userId: string, payload: unknown) => {
	if (!process.env.PUSHER_APP_ID) return;
	await pusherServer.trigger(`user-${userId}`, "notification", payload);
};



let conversation = [
	{ Role: "User", Message: "Hello" },
	{ Role: "Edith", Message: "How Can I help You" },
];
export function getGlobalConversation() {
	return conversation;
}
export function setGlobalConversation(Role, Message) {
	console.log(Role);
	if (Role === conversation[conversation.length - 1].Role) {
		conversation[conversation.length - 1].Message += Message;
	} else {
		conversation.push({ Role, Message });
	}
	return "done";
}
export function deleteGlobalConversation() {
	conversation = [];
	return "done";
}

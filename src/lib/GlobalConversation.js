let conversation = [];
export function getGlobalConversation() {
	return conversation;
}
export function setGlobalConversation(Role, Message) {
	if (
		conversation.length != 0 &&
		Role === conversation[conversation.length - 1].Role
	) {
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

export default {
  namespaced: true,
  state: {
    messages: null,
    selectedMessage: null,
  },
  actions: {},
  mutations: {
    setMessages(state, payload) {
      fetch(
        "https://my-json-server.typicode.com/Mariega/jsonServerHackatonFinal/messages"
      )
        .then((response) => response.json())
        .then((messages) => {
          state.messages = messages;
        })
        .catch((e) => console.log(e));
    },
    openMessage(state, payload) {
      state.selectedMessage = state.messages.filter((message) => {
        return message.messageId === payload;
      })[0];
    },
    setSelectedMessageNull(state, payload) {
      state.selectedMessage = null;
    },
  },
};

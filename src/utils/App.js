export default class App {
  isReady() {
    return new Promise((resolve, reject) => {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') resolve();
      });
    });
  }
}

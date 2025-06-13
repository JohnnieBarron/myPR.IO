import sendRequest from './sendRequest';

const BASE_URL = '/api/weight';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(weightData) {
  return sendRequest(BASE_URL, 'POST', weightData);
}
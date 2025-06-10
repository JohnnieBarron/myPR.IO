import sendRequest from "./sendRequest";

const BASE_URL = '/api/exercise';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(exerciseData) {
  return sendRequest(BASE_URL, 'POST', exerciseData);
}

export async function update(id, exerciseData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', exerciseData);
}

export async function remove(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
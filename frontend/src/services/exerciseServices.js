import sendRequest from "./sendRequest";

const BASE_URL = '/api/exercise';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(exerciseData) {
  return sendRequest(BASE_URL, 'POST', exerciseData);
}
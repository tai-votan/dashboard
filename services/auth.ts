import fetch from '@/lib/custom-fetch';

export const login = async (body: { username: string; password: string }) => {
  const res = await fetch('/auths/login', {
    method: 'POST',
    body,
  });

  console.log(`Func: login - PARAMS: res`, res);
  return res;
};

import Cookies from 'js-cookie';


const ACCESS_TOKEN_KEY = 'accessToken';


// Сохраняем accessToken в cookie на 3 часа
export function saveAccessToken(token: string) {
 Cookies.set(ACCESS_TOKEN_KEY, token, {
  httpOnly: true,  // НЕ РАБОТАЕТ в js-cookie, но для наглядности оставим
   secure: true,    // НЕ РАБОТАЕТ в js-cookie, но для наглядности оставим  
  sameSite: 'none', // НЕ РАБОТАЕТ в js-cookie, но для наглядности оставим
 });
}


// Читаем accessToken из cookie
export function getAccessToken(): string | undefined {
 return Cookies.get(ACCESS_TOKEN_KEY);
}


// Удаляем accessToken (при выходе)
export function clearAccessToken() {
 Cookies.remove(ACCESS_TOKEN_KEY);
}


// Проверяем: есть ли токен (= авторизован ли пользователь)
export function isAuthenticated(): boolean {
 return !!Cookies.get(ACCESS_TOKEN_KEY);
}


export default function getUsernameByEmail(email: string) {
    email = email.toLowerCase();
    return email.split('@')[0] + Math.floor(Math.random() * 1000);
}
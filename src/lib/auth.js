import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDb from "./db";
import User from "@/models/User";
import bcrypt from "bcrypt";

const authOption = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: String },
                password: { label: "Password", type: String },
            },
            async authorize(credentials) {
                const email = credentials.email;
                const password = credentials.password;

                await connectDb();
                const user = await User.findOne({ email });
                if (!user){
                    throw new Error("Email not found");
                }

                const checkPassword = await bcrypt.compare(password, user.password);
                if (!checkPassword){
                    throw new Error("Password not found");
                }
                
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account.provider === "google") {
                await connectDb();
                const email = user.email;
                let userExist = await User.findOne({ email });
                if (!userExist) {
                    userExist = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "user",
                    });
                }
                user.id = userExist._id;
                user.role = userExist.role;
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image ?? token.image;
                token.role = user.role;
            }

            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.role = token.role;
            session.user.image = token.image ?? session.user.image;
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    secret: process.env.NEXT_AUTH_SECRET,
}

export default authOption;
// Import all depencies
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
    // 1. buat schema validation
    const SignUpSchema = z.object({
        email: z
            .string()
            .email({ message: "Enter valid email" })
            .min(3, { message: "Email must be at least 3 characters long" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    });

    // 2. buat type dari z infer
    type SignUpSchemaType = z.infer<typeof SignUpSchema>;

    // 3. Inisialisasi
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchemaType>({
        mode: "onChange",
        resolver: zodResolver(SignUpSchema),
    });

    // 4. Buat fungsi untuk menghandle data ketika di submit
    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => alert("hey");

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#A7D7C5]">
            <div className="mx-10 max-w-screen-lg rounded-xl bg-[#F6FBF9] p-10">
                <div className="text-center">
                    <h1 className="mb-3 text-2xl font-bold text-[#212B27] md:text-5xl">
                        Create An Account
                    </h1>
                    <p className="text-sm text-[#32403B]">
                        Create an account to enjoy all the services without any
                        ads for free!
                    </p>
                </div>

                {/* 5. Pada form, tambahkan fungsi yang sudah diinisalisasi */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    method="post"
                    className="mt-10 w-full space-y-5 font-normal"
                >
                    <div>
                        {/* 6. Pada input, register sesuai dengan validasi */}
                        <input
                            type="email"
                            id="email"
                            className={`w-full rounded-lg border p-2.5 ${errors.email ? "border-red-500 focus:outline-red-500" : ""}`}
                            placeholder="Email Address"
                            {...register("email")}
                        />

                        {/* 7. Buat pesan tampilan error */}
                        <p className="text-red-500">{errors.email?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            id="password"
                            className={`w-full rounded-lg border p-2.5 ${errors.password ? "border-red-500 focus:outline-red-500" : ""}`}
                            placeholder="Password"
                            {...register("password")}
                        />
                        <p className="text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>
                    <button
                        disabled={
                            errors.email?.message || errors.password?.message
                                ? true
                                : false
                        }
                        className={`w-full rounded-xl p-3.5 text-center font-bold text-white ${errors.password?.message || errors.email?.message ? "cursor-not-allowed bg-[#84C7AE]/50" : "bg-[#84C7AE]"}`}
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-[#32403B]">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-[#84C7AE]">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#84C7AE]">
                            Privacy Policy
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default App;

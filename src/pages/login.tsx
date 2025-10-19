import { LoginForm } from "@/components/loginForm";


function LoginPage() {

    return (
        <>
            <div className=" flex justify-between">

                {/* Left side image */}
                <div className="flex-[6] h-screen">
                    <img className="h-full w-auto object-cover" 
                        src="https://images.unsplash.com/photo-1468324187476-c4e804213545?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2073" alt="" />
                </div>

                {/* Right side login form */}
                <div className="flex-[4] p-20 my-auto">
                    <LoginForm />
                </div>
            </div>
        </>
    );

}

export default LoginPage;

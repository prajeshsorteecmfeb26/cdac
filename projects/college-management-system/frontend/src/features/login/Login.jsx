import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loginSchema } from "./ValidationSchema";
import { toast } from "react-toastify";
import { loginAdmin, loginStudent } from "./Service";
import { getToken, storeRole, storeToken } from "./TokenService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {

    const navigate = useNavigate();

    const {
        register, // to register the input field of our form with react-hook-form
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver : yupResolver(loginSchema),
        defaultValues : {phone:'', password: ''}
    });

    useEffect(()=>{
        if(getToken()){
            navigate("/home")
        }
    },[]);

    const onSubmit = async (data)=>{
        console.log(data);
        try {
            const response = data.userType === "student"
              ? await loginStudent({ phone: data.phone, password: data.password })
              : await loginAdmin({ phone: data.phone, password: data.password });
            console.log(response);
            const loginData = response.data;
            storeToken(response.data.token);
            storeRole(response.data.role ?? (data.userType === "student" ? "student" : "admin"));
            navigate("/home");
        } catch (error) {
            console.log(error.response.data.message);
            
            toast.error(error.response.data.message);
        }
    }

    return (
        <Container className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-4" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>College Management System</h1>
            <Alert variant="info" className="w-100 shadow-sm" style={{ maxWidth: '400px' }}>Please login to continue</Alert>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
                <Form.Group className="mb-3">
                    <Form.Label>Login as</Form.Label>
                    <Form.Select {...register("userType")} defaultValue={"admin"}>
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="phone" 
                        placeholder="Enter Phone" 
                        { ...register("phone")}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        { ...register("password")}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100 mt-2 py-2" style={{ backgroundColor: 'var(--accent)', border: 'none' }}>Login</Button>
            </Form>
        </Container>
    )
}
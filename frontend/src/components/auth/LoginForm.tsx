'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStart, setAuthSuccess, setAuthFailure } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import { RootState } from '../../store';
import { toast } from 'sonner';

export function LoginForm({ initialIsLogin = true }: { initialIsLogin?: boolean }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setAuthStart());

    try {
      if (isLogin) {
        const { user, session } = await authService.login(email, password);
        dispatch(setAuthSuccess({ user, token: session.token }));
        toast.success('Đăng nhập thành công!');
        router.push('/profile');
      } else {
        await authService.register(email, name, password);
        
        // Export DB to json requirement
        const dataStr = JSON.stringify({ email, name, password }, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'user.json';
        link.click();
        
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
        dispatch(setAuthFailure('')); // Just reset loading
      }
    } catch (err: any) {
      toast.error(err.message || 'Có lỗi xảy ra');
      dispatch(setAuthFailure(err.message));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 style={{color: 'white', marginBottom: '1rem', textAlign: 'center'}}>
        {isLogin ? 'Đăng nhập vào hệ thống' : 'Tạo tài khoản mới'}
      </h3>
      
      {!isLogin && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Họ và tên</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Nguyễn Văn A" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
      )}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input 
          type="email" 
          className={styles.input} 
          placeholder="nhap@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Mật khẩu</label>
        <input 
          type="password" 
          className={styles.input} 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      
      <button type="submit" className={ styles.primary} disabled={isLoading}>
        {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
      </button>

      <p
        style={{
          color: "#a1a1aa",
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}

        <span
          style={{
            color: "#0088ff",
            cursor: "pointer",
            marginLeft: "0.5rem",
            fontWeight: 600,
          }}
          onClick={() => {
            setIsLogin(!isLogin);

            router.push(
              isLogin ? "/register" : "/login"
            );
          }}
        >
          {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
        </span>
      </p>

    </form>
  );
}
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; 
import { useAppContext } from "@context/AppContext";
import { useMessageDialog, MDTextField } from '@components';
import { customerChangePassword } from '@api';

const ChangePassword: React.FC = () => {
  const { state } = useAppContext();
  const { showMessage } = useMessageDialog()
  const changePasswordMutation = useMutation({
    mutationFn: (formData: {}) => customerChangePassword(state.token, formData),
    onSuccess: (resp: any) => {
      setSaving(false)
      if (resp.success) {
        showMessage({
          open: true,
          message: resp.message,
          type: "success",
          title: "Success!"
        })
      }
    },
    onError: (error: any) => {
      setSaving(false)
      if (error.errors) {
        showMessage({
          open: true,
          message: error.message,
          type: "error",
          title: "Error!"
        })
      } else if (error.message) {
        showMessage({
          open: true,
          message: error.message,
          type: "error",
          title: "Error!"
        })
      }
    }
  })

  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "" 
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true)
    changePasswordMutation.mutate(form)
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Change Password</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Replace with your Input component if available */}
        <MDTextField label="Current Password" type="password" value={form.current_password} 
          onChange={(e) => setForm(prev => ({...prev, current_password: e.target.value}))}
        />
        <MDTextField label="New Password" type="password" value={form.new_password} 
          onChange={(e) => setForm(prev => ({...prev, new_password: e.target.value}))}
        />
        <MDTextField label="Confirm New Password" type="password" value={form.confirm_password} 
          onChange={(e) => setForm(prev => ({...prev, confirm_password: e.target.value}))}
        />
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary py-2 rounded hover:font-bold transition"
        >
          {saving ? "...":"Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
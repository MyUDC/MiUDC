import Button from '@/components/buttons/Button'
import Input from '@/components/form/Input'
import React from 'react'

export const SignInForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <Input
        title="Correo"
        id="email"
        placeholder="Ingresa tu correo"
        type="email"
        name="email"
        autoComplete='email'
        autoFocus
      />
      <Input
        title="Contraseña"
        id="password"
        placeholder="Ingresa tu contraseña"
        type="password"
        name="password"
        autoComplete='current-password'
      />
      <div className="flex justify-between items-center text-xs text-green">
        <Button text="¿Olvidaste tu contraseña?" path="" variant="forgetGreen" />
      </div>
      <div className="pt-2">
        <Button text="Continuar" path="" variant="green" />
      </div>
    </form>
  )
}

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { LoginForm } from './login-form'
import { useAuth } from '../hooks/use-auth'

export function AuthModal() {
  const { isModalOpen, closeLoginModal } = useAuth()

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent
        className="bg-[#0e1015] border-neutral-800 text-white sm:max-w-[420px] p-6 sm:p-8 rounded-2xl shadow-2xl z-50 overflow-hidden"
        showCloseButton
      >
        <DialogTitle className="sr-only">Log In</DialogTitle>
        <DialogDescription className="sr-only">
          Log in with Riot Games, Discord, Google or Email and Password
        </DialogDescription>
        <LoginForm onSuccess={closeLoginModal} />
      </DialogContent>
    </Dialog>
  )
}

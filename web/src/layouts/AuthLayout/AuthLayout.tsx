import Footer from 'src/components/Footer/Footer'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <main className="bg-auth">
        <img
          src="/images/logo__secret-santa.svg"
          alt="Secret Santa"
          className="mx-auto mb-10 w-[460px] pt-24"
        />
        <div className="mx-auto max-w-[660px]">{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default AuthLayout

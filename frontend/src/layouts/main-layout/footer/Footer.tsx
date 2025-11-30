const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="wrapper border-t mt-16">
      <footer className="footer mx-auto py-5 text-center">
        shop.com &copy; {year} Все права защищены
      </footer>
    </div>
  )
}

export default Footer

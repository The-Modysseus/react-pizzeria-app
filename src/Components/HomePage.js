import { Navbar } from "./Navbar";

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1>Mo's pizzeria</h1>
      <Navbar />
      <p className="info">Best pizza in the whole of Jytland!</p>
      <p className="info">
        Order on the website to enjoy some pizza to-go, or come to our
        restaurant and eat in our cozy atmosphere
      </p>
      <p className="info">Our opening hours are:</p>
      <p className="info">Monday-Friday: 10:00 - 22:00</p>
      <p className="info">Saturday and sunday: 11:00 - 23:00</p>
      <p className="info">Address: Vester allé 22</p>
      <p className="info">Phone number: 12345678</p>
      <p className="info">Email: Mospizzeria@gmail.com</p>
      <footer>
        <p>© 2021 Mo's pizzeria</p>
        <p>Established in 1967</p>
      </footer>
    </div>
  );
}

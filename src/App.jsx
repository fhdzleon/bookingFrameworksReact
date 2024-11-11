import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={client}>
        <Switch>
          <Route path="/" component={HotelList} />
          <Route path="/hotel/:id" component={HotelDetail} />
        </Switch>
      </QueryClientProvider>
    </>
  );
}

export default App;

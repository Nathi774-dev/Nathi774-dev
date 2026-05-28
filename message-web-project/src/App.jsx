import Home from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Create from "./pages/Create";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MessageDetails from "./components/MessageDetails";
import NotFound from "./pages/NotFound";

function App(){
    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="content">
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/messages/:id" component={MessageDetails} />
                    <Route path="/*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;
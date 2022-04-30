import React from "react";
import { Route, Redirect } from "react-router-dom";
import {IsAuth} from "./isAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
        <Route
            {...rest}
            render={(props) => {
                if (IsAuth()===false) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/user",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;

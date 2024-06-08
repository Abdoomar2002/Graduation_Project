import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const AppRouters = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        // return route.layout ? (
        //   <Route key={index} {...(route.layout && route.layout)}>
        //     <Route path={route.path} element={route.element} />
        //   </Route>
        // ) : (
        //   <Route key={index} path={route.path} element={route.element} />
        // );

        return (
          <Route key={index} element={route.layout && route.layout}>
            <Route path={route.path} element={route.element} />
          </Route>
        );
      })}
    </Routes>
  );
};
export default AppRouters;

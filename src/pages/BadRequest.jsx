import ErrorPage from "../components/ErrorPage";

export default function BadRequest() {
    return <ErrorPage errorCode="400" errorDescription="Bad Request" />;
}
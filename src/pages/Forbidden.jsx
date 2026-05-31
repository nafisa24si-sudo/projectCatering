import ErrorPage from "../components/ErrorPage";

export default function Forbidden() {
    return <ErrorPage errorCode="403" errorDescription="Forbidden" />;
}
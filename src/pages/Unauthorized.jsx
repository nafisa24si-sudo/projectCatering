import ErrorPage from "../components/ErrorPage";

export default function Unauthorized() {
    return <ErrorPage errorCode="401" errorDescription="Unauthorized" />;
}
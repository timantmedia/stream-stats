<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<%
    String streamid = request.getParameter("streamid");
    if (streamid == null || streamid.isEmpty()) {
        response.setStatus(400);
        out.println("{ \"error\": \"Stream id is missing.\" }");
        return;
    }

    String scheme = request.getScheme();
    String serverName = request.getServerName();
    int serverPort = request.getServerPort();
    String contextPath = request.getContextPath();
    String baseUrl = scheme + "://" + serverName + ":" + serverPort + contextPath;

    String url = baseUrl + "/rest/v2/broadcasts/" + streamid + "/broadcast-statistics";

    HttpURLConnection connection = null;
    BufferedReader reader = null;

    try {
        URL apiUrl = new URL(url);
        connection = (HttpURLConnection) apiUrl.openConnection();
        connection.setRequestMethod("GET");

        int statusCode = connection.getResponseCode();
        if (statusCode == 200) {
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder responseBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBuilder.append(line);
            }
            out.println(responseBuilder.toString());
        } else {
            response.setStatus(statusCode);
            out.println("{ \"error\": \"An error occurred.\" }");
        }
    } catch (Exception e) {
        response.setStatus(500);
        out.println("{ \"error\": \"An error occurred.\" }");
    } finally {
        if (reader != null) {
            reader.close();
        }
        if (connection != null) {
            connection.disconnect();
        }
    }
%>

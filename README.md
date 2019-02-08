[![Build Status](https://travis-ci.com/akinyeleolat/politico.svg?branch=develop)](https://travis-ci.com/akinyeleolat/politico)
[![Coverage Status](https://coveralls.io/repos/github/akinyeleolat/politico/badge.svg?branch=develop)](https://coveralls.io/github/akinyeleolat/politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
# Politico

# Description
Politico is an online voting app which enables citizens give their mandate to politicians running for different government offices
while building trust in the process through transparency.

# Table of Contents
<ul>
            <li>
                <a href="#Technologies">Technologies</a>
            </li>
            <li>
                <a href="#Features">Features</a>
            </li>
          <li>
                <a href="#Installations">Installation</a>
            </li>
        </ul>
        
# Technologies
Currently,
<ul>
<li> HyperText Mark-up Language (HTML) </li>
<li>Cascade Style Sheet (CSS)</li>
<li>Vanilla Javascript</li>
<li>PostgreSQL Database(raw SQL):</li>
<li>Nodejs (Express framework)</li>
  </ul>
  
# Pivotal Tracker
Politico app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is (https://www.pivotaltracker.com/projects/2240024)

# UI Templates
The application is hosted online on gh-pages with [ Politico ] (https://akinyeleolat.github.io/politico/UI/)
LOGIN TO DEMO ADMIN
<ul>
<li>username:admin@gmail.com</li>
<li>password:admin</li>
</ul>
LOGIN TO DEMO POLITICIAN
<ul>
<li>username:politician@gmail.com</li>
<li>password:admin</li>
</ul>
LOGIN TO DEMO USER
<ul>
<li>username:oluwatosin@gmail.com</li>
<li>password:admin</li>
</ul>

# API Documentation
The API documentation can be seen on [ Politico ] (https://ngpolitico.herokuapp.com/api-docs)

# Features
Currently,
<ul>
<li>Users Sign up</li>
<li>Users Sign In</li>
<li>Admin (electoral body) can create political parties.</li>
<li>Admin (electoral body) can delete a political party.</li>
<li>Admin (electoral body) can create different political offices .</li>
<li>Users can vote for only one politician per political office .</li>
<li>Users can see the results of election</li>
</ul>
<ul>Optional Features
<li>User can reset password.</li>
<li>A politician can create a petition against a concluded political office election.</li>
  </ul>

# Getting Started
# Installation
install POSTMAN app
run npm run start then navigate to localhost:3000 on POSTMAN
# API Endpoint Route
Currently,
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/parties/</td>
    <td>Create A Political Party</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/offices/</td>
    <td>Create A Political Office</td>
  </tr>
   <tr>
    <td>PATCH</td>
    <td>api/v1/parties/partyId</td>
    <td>Edit a specific political party</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>api/v1/parties/partyId</td>
    <td>Delete a specific political party</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/parties/</td>
    <td>Get all political party</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/parties/partyId</td>
    <td>Get specific political party</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/offices</td>
    <td>Get all political office</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/offices/officeId</td>
    <td>Get specific political office</td>
  </tr>
  </table>
  
# Author
Akinyele Oluwatosin
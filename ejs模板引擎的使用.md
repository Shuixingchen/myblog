## ejs模板引擎

1. 加载其他文件

<%- include('header') -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer') -%>

2. 输出变量内容

     <%= title %>

3. 判断

<% if(comic) { %>
    <h2><%= comic.name %></h2>
<% } else { %>
	<h2></h2>
<% } %>

4. 循环

 <%for (var i=0;i<data1.length;i++){%>
      <li><%=data1[i]%></li>
 <%}%>


## 模板

以后把前端页面都叫模板



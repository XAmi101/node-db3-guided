# Problem

A client has hired you to track zoo animals.
For each animal, you must track their name, species, and all zoos in which they have resided (including zoo name and address).

Determine the database tables necessary to track this information.

Label any relationships between table.

o.* is a shortcut that means give me everything from the orders table

```sql template
select * from source_table
join new_table on source_table.column  = new_table.column
```

https://www.w3schools.com/sql/trysql.asp?filename=trysql_op_inå

```sql
SELECT c.customername as Customer
, c.contactname as contact
, c.country
, s.shippername as DeliverdBy
, s.phone as ShipperPhone
, o.orderid
, o.OrderDate
FROM [Orders] as o
join shippers as s on o.shipperid = s.shipperid
join customers as c on o.customerid = c.customerid
order by o.customerid;


-- the list of ALL our customers and their orders regardless of wether they have orders or not, USE LEFT JOIN
select c.CustomerName, c.City, o.* 
from customers as c
left join orders as o on c.customerId = o.customerId
order by c.customerId;




select categoryId, count(*) as Count, min(price) as Cheapest, avg(price) as AveragePrice, max(price) as mostVersion
from products
group by categoryId;

select p.categoryId
, c.categoryName as Category
, count(*) as Count
, round(min(p.price), 2) as Cheapest
, round(avg(p.price), 2) as AveragePrice
, round(max(p.price), 2) as AppleVersion
from products as p
join categories as c on p.categoryId = c.categoryId
group by c.categoryId;
```

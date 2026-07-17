(1) Update Column Data Type
----------------------------
==> ALTER TABLE customers ALTER COLUMN created_at SET DATA TYPE DATE; 

(2) Default value For Column
----------------------------
==> ALTER TABLE customers ALTER COLUMN created_at SET DEFAULT CURRENT_DATE;

(3) Add New Column
----------------------------
==> ALTER TABLE customers ADD COLUMN updated_at DATE DEFAULT CURRENT_DATE;

(4) Remove Column Default value
---------------------------------
==> ALTER TABLE customers ALTER COLUMN created_at DROP DEFAULT;


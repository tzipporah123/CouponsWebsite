import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Campany {
    public static void main(String[] args) {

        //going to the site.
        System.setProperty("webdriver.chrome.driver",
                "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:4200/login");

        //user details:
        String myEmail = "Lenovo@gmail.com";
        String myPassword = "Lenovo1234";

        //login
        driver.findElement(By.xpath("//input[@id='clientEmail']")).sendKeys(myEmail);
        driver.findElement(By.xpath("//input[@id='clientPassword']")).sendKeys(myPassword);
        driver.findElement(By.xpath("//input[@value='COMPANY']")).click();
        WebElement submitClient = driver.findElement(By.xpath("//*[contains(@type,'sub')]"));
        submitClient.click();
        submitClient.submit();

        //New Coupon details:
        String title = "computer";
        String description = "50% off computer";
        String startDate = "02/01/002022/03:03";
        String endDate = "10/10/002023/03:22";
        double price = 255.3;
        int amount = 96;
        String pic = "/u200F/u200Fתמונות/computer.jpg";
        int category = 3;

        //create new coupon:
        driver.findElement(By.xpath(".//a[text()='coupons']")).click();
        driver.findElement(By.xpath("//*[text()='New Coupon']")).click();

        driver.findElement(By.xpath("//input[@id='title']")).sendKeys(title);
        driver.findElement(By.xpath("//input[@id='description']")).sendKeys(description);
        driver.findElement(By.xpath("//input[@id='startDate']")).sendKeys(startDate);
        driver.findElement(By.xpath("//input[@id='endDate']")).sendKeys(endDate);
        driver.findElement(By.xpath("//input[@id='price']")).sendKeys(String.valueOf(price));
        driver.findElement(By.xpath("//input[@id='amount']")).sendKeys(String.valueOf(amount));
        driver.findElement(By.xpath("//input[@id='imageurl']")).sendKeys(pic);
        driver.findElement(By.xpath("//input[@id='category']")).sendKeys(String.valueOf(category));

        driver.findElement(By.xpath("//*[contains(@type,'sub')]")).click();

        //Edit coupon:
        driver.findElement(By.xpath("//*[text()='my coupons']")).click();
        driver.findElement(By.xpath(".//h3[text()='" + title + "']")).click();
        driver.findElement(By.xpath("//*[text()='Edit']")).click();
        String newDescription = "50% off all computer";
        driver.findElement(By.xpath("//input[@id='description']")).clear();
        driver.findElement(By.xpath("//input[@id='description']")).sendKeys(newDescription);

        driver.findElement(By.xpath("//*[contains(@type,'sub')]")).click();

        //Edit client details:
        driver.findElement(By.xpath(".//a[text()='client']")).click();
        driver.findElement(By.xpath("//*[text()='Edit detils']")).click();

        String newName = "Lenovo1";
        driver.findElement(By.xpath("//input[@id='name']")).clear();
        driver.findElement(By.xpath("//input[@id='name']")).sendKeys(newName);
        driver.findElement(By.xpath("//*[contains(@type,'sub')]")).click();

        //Logout:
        driver.findElement(By.xpath("//*[text()='Logout']")).click();
    }
}
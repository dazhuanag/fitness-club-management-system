package com.ideabobo.util;

public class MailUtil {
    public static void main(String[] args){
        //这个类主要是设置邮件
        MailSenderInfo mailInfo = new MailSenderInfo();
        mailInfo.setMailServerHost("smtp.126.com");
        mailInfo.setMailServerPort("25");
        mailInfo.setValidate(true);
        mailInfo.setUserName("ideabobo");
        mailInfo.setPassword("_41923364");//您的邮箱密码
        mailInfo.setFromAddress("ideabobo@126.com");
        mailInfo.setToAddress("543548596@qq.com");
        mailInfo.setSubject("testbiaoti");
        mailInfo.setContent("testneirong");
        //这个类主要来发送邮件
        SimpleMailSender sms = new SimpleMailSender();
        //sms.sendTextMail(mailInfo);//发送文体格式
        boolean flag = sms.sendHtmlMail(mailInfo);//发送html格式
        if(flag){
            System.out.println("邮件发送成功");
        }else{
            System.out.println("邮件发送失败");
        }
    }

    public static boolean sendEmail(String to,String title,String content){
        //这个类主要是设置邮件
        MailSenderInfo mailInfo = new MailSenderInfo();
        mailInfo.setMailServerHost("smtp.126.com");
        mailInfo.setMailServerPort("25");
        mailInfo.setValidate(true);
        mailInfo.setUserName("ideabobo");
        mailInfo.setPassword("_41923364");//您的邮箱密码
        mailInfo.setFromAddress("ideabobo@126.com");
        mailInfo.setToAddress(to);
        mailInfo.setSubject(title);
        mailInfo.setContent(content);
        //这个类主要来发送邮件
        SimpleMailSender sms = new SimpleMailSender();
        //sms.sendTextMail(mailInfo);//发送文体格式
        boolean flag = sms.sendHtmlMail(mailInfo);//发送html格式
        if(flag){
            System.out.println("邮件发送成功");
        }else{
            System.out.println("邮件发送失败");
        }
        return flag;
    }

}
